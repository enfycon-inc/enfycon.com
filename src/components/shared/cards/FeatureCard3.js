const FeatureCard3 = ({ feature, idx }) => {
	const { icon, title, desc } = feature ? feature : {};
	return (
		<div className="choose-box" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
			<div className="choose-content">
				<div className="choose-icon">
					<i className={icon}></i>
				</div>
				<h4 className="title">{title}</h4>
				<p className="desc">{desc}</p>
			</div>
		</div>
	);
};

export default FeatureCard3;
