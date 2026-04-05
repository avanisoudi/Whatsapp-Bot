import sqlite3
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self, db_path="bot/data/bot.db"):
        self.db_path = db_path
        self.conn = None
        self.cursor = None
        self._connect()
        self._create_tables()

    def _connect(self):
        try:
            self.conn = sqlite3.connect(self.db_path)
            self.cursor = self.conn.cursor()
            logger.info(f"Connecté à la base de données SQLite : {self.db_path}")
        except sqlite3.Error as e:
            logger.error(f"Erreur de connexion à la base de données : {e}")
            # Gérer l'erreur de manière appropriée, par exemple, quitter l'application
            exit(1)

    def _create_tables(self):
        try:
            self.cursor.execute("""
                CREATE TABLE IF NOT EXISTS guild_settings (
                    guild_id INTEGER PRIMARY KEY,
                    log_channel_id INTEGER,
                    prefix TEXT
                )
            """)
            self.cursor.execute("""
                CREATE TABLE IF NOT EXISTS user_warnings (
                    user_id INTEGER,
                    guild_id INTEGER,
                    warning_count INTEGER DEFAULT 0,
                    PRIMARY KEY (user_id, guild_id)
                )
            """)
            self.conn.commit()
            logger.info("Tables de la base de données vérifiées/créées.")
        except sqlite3.Error as e:
            logger.error(f"Erreur lors de la création des tables : {e}")

    def get_guild_setting(self, guild_id, setting_name, default_value=None):
        try:
            self.cursor.execute(
                f"SELECT {setting_name} FROM guild_settings WHERE guild_id = ?",
                (guild_id,)
            )
            result = self.cursor.fetchone()
            return result[0] if result else default_value
        except sqlite3.Error as e:
            logger.error(f"Erreur lors de la récupération du paramètre {setting_name} pour la guilde {guild_id}: {e}")
            return default_value

    def set_guild_setting(self, guild_id, setting_name, setting_value):
        try:
            self.cursor.execute("""
                INSERT OR REPLACE INTO guild_settings (guild_id, log_channel_id, prefix)
                VALUES (?, ?, ?)
            """, (guild_id, setting_value if setting_name == 'log_channel_id' else self.get_guild_setting(guild_id, 'log_channel_id'),
                  setting_value if setting_name == 'prefix' else self.get_guild_setting(guild_id, 'prefix')))
            self.conn.commit()
            logger.info(f"Paramètre {setting_name} mis à jour pour la guilde {guild_id}.")
        except sqlite3.Error as e:
            logger.error(f"Erreur lors de la mise à jour du paramètre {setting_name} pour la guilde {guild_id}: {e}")

    def get_user_warnings(self, user_id, guild_id):
        try:
            self.cursor.execute(
                "SELECT warning_count FROM user_warnings WHERE user_id = ? AND guild_id = ?",
                (user_id, guild_id)
            )
            result = self.cursor.fetchone()
            return result[0] if result else 0
        except sqlite3.Error as e:
            logger.error(f"Erreur lors de la récupération des avertissements pour l'utilisateur {user_id} dans la guilde {guild_id}: {e}")
            return 0

    def add_user_warning(self, user_id, guild_id):
        try:
            self.cursor.execute("""
                INSERT INTO user_warnings (user_id, guild_id, warning_count)
                VALUES (?, ?, 1)
                ON CONFLICT(user_id, guild_id) DO UPDATE SET warning_count = warning_count + 1
            """, (user_id, guild_id))
            self.conn.commit()
            logger.info(f"Avertissement ajouté pour l'utilisateur {user_id} dans la guilde {guild_id}.")
        except sqlite3.Error as e:
            logger.error(f"Erreur lors de l'ajout d'un avertissement pour l'utilisateur {user_id} dans la guilde {guild_id}: {e}")

    def close(self):
        if self.conn:
            self.conn.close()
            logger.info("Connexion à la base de données fermée.")

# Créer le dossier data s'il n'existe pas
os.makedirs("bot/data", exist_ok=True)
