
class User():
    def __init__ (self, username, pwd, email, first, last):
        self.username = username
        self.password = pwd
        self.email = email
        self.first = first
        self.last = last
    def register (self):
        return({'username': self.username, "password": self.password, 'email': self.email, 'first': self.first, 'last': self.last})

        


