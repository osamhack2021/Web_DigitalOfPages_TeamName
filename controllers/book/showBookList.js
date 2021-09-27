import { BookModel, UserModel, ApplyBookModel } from '../../models';
import { saver, printer } from '../../utils';

export default function showBookList(req, res) {
	const paramPage = req.body.page || req.query.page || 'err';
	const paramPerPage = 8;

	// req.body.perPage || req.query.perPage;

	const database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage,
			criteria: { group: req.user.group },
		};

		BookModel.list(options, function (err, results) {
			if (err) {
				console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);

				printer.errrendering(res, err);

				return;
			}

			if (results) {
				//console.log('###요청 파라미터(result):\n ' +results);
				//console.dir(results);
				for (var i = 0; i < results.length; i++) {
					if (results[i].writer == null) {
						results[i].writer = { name: '(알수없음)', email: 'unknown' };
					}
				}
				// 전체 문서 객체 수 확인
				database.BookModel.count().exec(function (err, count) {
					res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });

					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 목록',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage,
						totalRecords: count,
						size: paramPerPage,
					};
					currentPage = context.page;
					req.session.passport.user.PreviousPage = context.page;
					req.session.save();
					console.log(req.session);
					body = context;
					//console.log('요청 파라미터(currentPage) ------> ' +currentPage);
					// printer.rendering(req,res,'lists/listbook.ejs',context);
					return context;
				});
			} else {
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
}