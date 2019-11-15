$(document).ready(function() {
        $('#submit').on('click', function (event) {
        event.preventDefault();
        let newBurger = {
            burger_name: $('#newBurgerName').val().trim(),
        };
        $.post("/api/burgers", newBurger, function (data) {
            location.reload();
        });
    });
});

function update(id) {
    let updatedState = {
        devoured: true
    };
    $.ajax('/api/burgers/' + id, {
        type: "PUT",
        data: updatedState
      }).then(
        function() {
          location.reload();
        }
      );
}