service UserService @(requires: 'User') {

    function getUserInfo() returns {
        username : String;
        email    : String;
        roles    : array of String;
    };
}
