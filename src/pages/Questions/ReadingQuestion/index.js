import { Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import BgProfile from '../../../assets/images/bg-works.jpg';
import './read.question.scss';

const ReadQuestion = () => {
	const { Title, Paragraph } = Typography;

	return (
		<div className='read'>
			<div className='container'>
				<div className='profile-nav-bg m-0 image-bg' style={{ backgroundImage: 'url(' + BgProfile + ')' }}></div>
				<div className='read-title'>
					<Title level={3}>
						<QuestionCircleOutlined /> Các bài học được phát triển học được phát triển học được phát triển phù hợp với từ cơ bản đến nâng
						cao
					</Title>

					<Paragraph level={5} className='read-time'>
						Ha Bui - Jun 18, 2022
					</Paragraph>
				</div>
				<div className='read-content'>
					<Paragraph level={4}>
						Mình có đọc qua vài bình luận ở dưới một số video trong khóa JS cơ bản và thấy một số bạn muốn có thêm bài tập thực hành (cụ thể
						là phần mảng/array và vòng lặp/loop), ngoài ra mình thấy khóa đó anh Sơn cũng chưa nói nhiều về phương pháp tư duy cũng như
						thuật toán nên mình muốn chia sẻ tới các bạn một số keyword để research cũng như thực hành để cải thiện kỹ năng bản thân (ngoài
						ra cũng test luôn chức năng viết blog xD trên F8)
					</Paragraph>
					<Paragraph level={4}>
						Mình có đọc qua vài bình luận ở dưới một số video trong khóa JS cơ bản và thấy một số bạn muốn có thêm bài tập thực hành (cụ thể
						là phần mảng/array và vòng lặp/loop), ngoài ra mình thấy khóa đó anh Sơn cũng chưa nói nhiều về phương pháp tư duy cũng như
						thuật toán nên mình muốn chia sẻ tới các bạn một số keyword để research cũng như thực hành để cải thiện kỹ năng bản thân (ngoài
						ra cũng test luôn chức năng viết blog xD trên F8)
					</Paragraph>
					<Paragraph level={4}>
						Mình có đọc qua vài bình luận ở dưới một số video trong khóa JS cơ bản và thấy một số bạn muốn có thêm bài tập thực hành (cụ thể
						là phần mảng/array và vòng lặp/loop), ngoài ra mình thấy khóa đó anh Sơn cũng chưa nói nhiều về phương pháp tư duy cũng như
						thuật toán nên mình muốn chia sẻ tới các bạn một số keyword để research cũng như thực hành để cải thiện kỹ năng bản thân (ngoài
						ra cũng test luôn chức năng viết blog xD trên F8)
					</Paragraph>
					<Paragraph level={4}>
						Mình có đọc qua vài bình luận ở dưới một số video trong khóa JS cơ bản và thấy một số bạn muốn có thêm bài tập thực hành (cụ thể
						là phần mảng/array và vòng lặp/loop), ngoài ra mình thấy khóa đó anh Sơn cũng chưa nói nhiều về phương pháp tư duy cũng như
						thuật toán nên mình muốn chia sẻ tới các bạn một số keyword để research cũng như thực hành để cải thiện kỹ năng bản thân (ngoài
						ra cũng test luôn chức năng viết blog xD trên F8)
					</Paragraph>
				</div>
			</div>
		</div>
	);
};

export default ReadQuestion;
