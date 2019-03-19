$(function(){
	$('button').click(function(){
		var user = $('#txtUsername').val();
		var pass = $('#txtPassword').val();
		var code = $('#txtClassCode').val();
		console.log(user, pass, code)
		$.ajax({
			url: 'http://127.0.0.1:5000/student',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});
