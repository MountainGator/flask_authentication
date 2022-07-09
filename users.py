import bcrypt

class User():
    
    @classmethod
    def register (cls, username, pwd, email, first, last):
        hashed = bcrypt.generate_password_hash(pwd)
        hashed_utf8 = hashed.decode('utf8')

        return cls(username=username, password=hashed_utf8, email=email, first=first, last=last)
        


