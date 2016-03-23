/**
 * Created by matthewthoms on 2016-03-20.
 */
//Delete Function.
//Making sure to ask the user if they really want to delete.

$(document).ready; {
    console.log('DOM Ready!')
    $('.confirm_delete').on('click', function() {
        return confirm('Are you sure you want to delete this?');
    });
};
