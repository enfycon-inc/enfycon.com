import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import modifyNumber from "@/libs/modifyNumber";

const ServiceCard7 = ({ service, idx, lastItemIdx, categoryId }) => {
	const {
		title,
		desc3,
		id,
		totalProject,
		img4 = "/images/service/h6-service-1.webp",
		svg,
		iconName,
	} = service || {};

	const href = categoryId ? `/services/${categoryId}/${id}` : `/services/${id}`;

	return (
		<div className="h6-service-item">
			<div className="h6-service-thumb">
				<Link href={href}>
					<Image
						src={img4}
						alt={title || "Service image"}
						width={300}
						height={240}
						quality={85}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="h6-service-image"
						priority={idx === 0}
					/>
				</Link>
			</div>
			<div className="h6-service-content">
				{/* <h5 className="h6-service-index">{modifyNumber(id)}.</h5> */}
				<div className="h6-service-title-wrap">
					<h4 className="title">
						<Link href={href}>{title}</Link>
					</h4>
					<Link className="text-btn" href={href}>
						<span className="btn-icon">
							<i className="tji-arrow-right-long"></i>
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default memo(ServiceCard7);
