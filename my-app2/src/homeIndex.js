import React from 'react';
import Back from './static/images/blog-1.jpg';
require('./static/css/icomoon.css');
require('./static/css/home.css');


class TopImg extends React.Component{
	render() {
		return (
			<div>
				<aside id="colorlib-hero">
					<div className="flexslider">
						<ul className="slides">
						<li className="back-image">
							<div className="overlay"></div>
							<div className="container">
								<div className="row">
									<div className="col-md-6 col-md-pull-3 col-sm-12 col-xs-12 col-md-offset-3 slider-text">
										<div className="slider-text-inner">
											<div className="desc">
												<p className="meta">
														<span className="cat"><a href="#">CUIT-ACM</a></span>
														<span className="date">2012 - now</span>
														<span className="pos">By <a href="#">Rich</a></span>
													</p>
												<h1>成都信息工程大学 - ACM国际大学生程序设计大赛</h1>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						</ul>
					</div>
				</aside>
			</div>
		);
	}
}

var award = [
	{
		"classify": "荣誉",
		"date": "2018 - 10 - 01",
		"image": require('./static/images/blog-1.jpg'),
		"author": "gyt",
		"title": "ACM/ICPC",
		"metail": "gsfdgfd"
	},
	{
		"classify": "荣誉",
		"date": "2018 - 10 - 01",
		"image": require('./static/images/blog-1.jpg'),
		"author": "gyt",
		"title": "ACM/ICPC",
		"metail": "gsfdgfd"
	},
	{
		"classify": "荣誉",
		"date": "2018 - 10 - 01",
		"image": require('./static/images/blog-1.jpg'),
		"author": "gyt",
		"title": "ACM/ICPC",
		"metail": "gsfdgfd"
	}
];
class NewsList extends React.Component{
	
	 fn(data, num) {
        console.log('---');
	 }
	render() {
		return (
			<div className="row row-pb-md">
				<New award={award} pfn={this.fn.bind(this)}/>
			</div>
		)
	}
}
class New extends React.Component{
	
	clickFun(text, num) {
        this.props.pfn(text, num)//这个地方把值传递给了props的事件当中
    }
	render() {
		return(
			this.props.award.map(item => {
				return (
				<div className="col-md-4">
					<div className="blog-entry">
						<div className="blog-img">
							<a href="#"><img src={item.image} className="img-responsive" alt="html5 bootstrap template" /></a>
						</div>
						<div className="desc">
							<p className="meta">
								<span className="cat"><a href="#">{item.classify}</a></span>
								<span className="date">{item.date}</span>
								<span className="pos">By <a href="#">{item.author}</a></span>
							</p>
						<h2><a href="#">{item.title}</a></h2>
						<p>{item.metail}</p>
						</div>
					</div>
				</div>
				)
			})
		)
	}
}

class Vidio extends React.Component{
	render() {
		return (
			<div id="colorlib-container">
					<div className="container">
						<div className="row row-pb-md">
							<NewsList />
						</div>
						<div className="row row-pb-md">
							<div className="col-md-2">
							</div>
							<div className="col-md-8">
								<div className="blog-entry">
									<div className="blog-img">
										<div className="video colorlib-video back-imageVidio" >
											<a href="https://www.baidu.com" className="popup-vimeo" target="_blank"><i className="icon-play"></i></a>
											<div className="overlay"></div>
										</div>
									</div>
									<div className="desc">
										<p className="meta">
											<span className="cat"><a href="#">Watch</a></span>
											<span className="date">2018 - 11 - 25</span>
											<span className="pos">By <a href="#">ACM实验室</a></span>
										</p>
										<h2><a href="#" target="_blank">招新视频</a></h2>
										<p>想要了解更多关于ACM实验室的事吗？点开我吧</p>
									</div>
								</div>
							</div>
							<div className="col-md-2">
							</div>
						</div>
					</div>
					
				</div>
		)
	}
}
class HomeIndex extends React.Component{
	
	render() {
		return(
			<div>
				<TopImg />
				<Vidio />
				
			</div>
		);
	}
}

export default HomeIndex;