var findFriends = (req, res) => {
    console.log('findFriends 모듈 안에 있는 findFriends 호출됨.');
	var paramUser = req.body.friend || req.query.friend || req.params.friend;

	var database = req.app.get('database');		
	if(paramUser!=req.user.email){
		if (database.db) {

			database.UserModel.findOne({email:paramUser}).exec(function (err, results) {
			   if (err) {
					 console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
					 printer.errrendering(res, err);

					 return;
				}
					
			res.render('friendProfile.ejs', { user:results, login_success: true });

			});
		} else {
			printer.errrendering(res);
		}
	}else{
		 res.redirect('/profile');
	}
};
module.exports.findFriends = findFriends;
