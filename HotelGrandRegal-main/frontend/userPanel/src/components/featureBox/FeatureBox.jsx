export default function FeatureBox({img, tilte, subTitle, info, features}){
    return (
        <div className={style.featureCard1}>
            <div className={style.featureInfo}>
                <div className={style.featureContent}>
                    <h2 className={style.subTitle}>{subtitle}</h2>
                    <p className={style.info}>
                        {info}
                    </p>
                    <button className={style.infoBtn}>Know More <img src={arrow1}/></button>
                    <div className={style.features}>
                        <span>
                            <img src="" alt="" />
                            <h6>{features[0].value}</h6>
                        </span>
                        <span>
                            <img src="" alt="" />
                            <h6>{features[1].value}</h6>
                        </span>
                        <span>
                            <img src="" alt="" />
                            <h6>{features[2].value}</h6>
                        </span>
                        <span>
                            <img src="" alt="" />
                            <h6>{features[3].value}</h6>
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.frame}><Frame img = {img} isInvert ={true} /></div>
            <h1 className={style.featureTitle}>{title}</h1>
        </div>
    );
}