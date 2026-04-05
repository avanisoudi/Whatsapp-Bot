import asyncio
import time

class RateLimiter:
    def __init__(self, rate_limit_seconds, max_actions):
        self.rate_limit_seconds = rate_limit_seconds
        self.max_actions = max_actions
        self.user_actions = {}
        self.lock = asyncio.Lock()

    async def acquire(self, user_id):
        async with self.lock:
            if user_id not in self.user_actions:
                self.user_actions[user_id] = []
            
            current_time = time.time()
            # Supprimer les actions expirées
            self.user_actions[user_id] = [t for t in self.user_actions[user_id] if current_time - t < self.rate_limit_seconds]

            if len(self.user_actions[user_id]) >= self.max_actions:
                return False # Limite atteinte
            
            self.user_actions[user_id].append(current_time)
            return True # Action autorisée

    async def get_remaining_time(self, user_id):
        async with self.lock:
            if user_id not in self.user_actions or not self.user_actions[user_id]:
                return 0
            
            oldest_action_time = self.user_actions[user_id][0]
            time_passed = time.time() - oldest_action_time
            if time_passed >= self.rate_limit_seconds:
                return 0
            return self.rate_limit_seconds - time_passed
