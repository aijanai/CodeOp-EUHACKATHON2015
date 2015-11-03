Template.enterAs.events({
    "click .player": function(evt){
        evt.preventDefault();
        var playerName = $("[name=playerName]").val(),
            // playRole: 'alice' = player, 'bob' = player who reviews the code thereafter
            playerRole = evt.target.getAttribute('data-role'),
            routeName = (playerRole == 'alice' ? 'aStart' : 'bStart');

        // create user by real name, unless it already exists
        Meteor.call('playerExists', playerName, function(error, result){
            Session.set('playerName', playerName);
            if (result){
                Session.set('returningPlayer', true);
                Router.go(routeName);
            } else {
                lg("create new user");
                Meteor.call('createPlayer', playerName, playerRole, function (error, result) {
                    if (result) {
                        // newly create user id
                        lg(result);
                        Router.go(routeName);
                    }

                    if (error){
                        // do nothing
                        lg(error);
                    }
                });
                Session.set('returningPlayer', false);
            }
        });
    }
});