let userManager = (function(){

    class UserManager {
    
        constructor() {
            let storedUsers = JSON.parse(localStorage.getItem('users'));
            storedUsers ? this.users = [...storedUsers] : this.users = [];
            
        }
    
        
        validateCredentials(username, password) {
            return this.users.some(user => user.username === username && 
                                           user.password === password 
            );
        }
    
        addUser(username, password) {
            if(!this.checkForExistingUser(username)) {
                this.users.push(new User(username, password));
                localStorage.setItem('users', JSON.stringify(this.users));

                return true;
            }
            return false;
        }
    
        checkForExistingUser(username) {
            return this.users.some(user => user.username === username);
        }
    
    }

    return new UserManager();

})();