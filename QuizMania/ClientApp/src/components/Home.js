import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="row">
                <div className="col-lg-8">
                    <h2>Welcome to Quote</h2>
                    <p className="lead">
                        One stop shop for Quizes.
                    </p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="box_feat" id="icon_1">
                                <span />
                                <h3>Responsive site design</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                    dolor sit amet, consectetur adipiscing elit. Donec
                                    hendrerit vehicula est, in consequat. Donec hendrerit
                                    vehicula est, in consequat. Donec hendrerit vehicula est,
                                    in consequat.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="box_feat" id="icon_2">
                                <span />
                                <h3>Web site check</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                    dolor sit amet, consectetur adipiscing elit. Donec
                                    hendrerit vehicula est, in consequat. Donec hendrerit
                                    vehicula est, in consequat. Donec hendrerit vehicula est,
                                    in consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* /row */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="box_feat" id="icon_3">
                                <h3>Email campaigns</h3>
                                <p>
                                    Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat
                                    cu pri. In eum omnes molestie. Sed ad debet scaevola, ne mel.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="box_feat" id="icon_4">
                                <h3>Seo optimization</h3>
                                <p>
                                    Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat
                                    cu pri. In eum omnes molestie. Sed ad debet scaevola, ne mel.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* /row */}
                    <hr />
                    <div className="row">
                        <div className="col-md-6">
                            <div className="about_info">
                                <i className="pe-7s-news-paper" />
                                <h4>
                                    A brief about Quote
                                    <span>Suas summo id sed, erat erant oporteat cu pri.</span>
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                    dolor sit amet, consectetur adipiscing elit. Donec
                                    hendrerit vehicula est, in consequat. Donec hendrerit
                                    vehicula est, in consequat. Donec hendrerit vehicula est,
                                    in consequat.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="about_info">
                                <i className="pe-7s-light" />
                                <h4>
                                    Mission<span>Suas summo id sed, erat erant oporteat cu pri.</span>
                                </h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                    dolor sit amet, consectetur adipiscing elit. Donec
                                    hendrerit vehicula est, in consequat. Donec hendrerit
                                    vehicula est, in consequat. Donec hendrerit vehicula est,
                                    in consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* /row */}
                </div>
                {/* /col */}
                <aside className="col-lg-4">
                    <div className="more_padding_left">
                        <div className="widget" id="review">
                            <h4>reviews</h4>
                            <div className="owl-carousel owl-theme add_bottom_30 owl-loaded owl-drag">
                                {/* /item */}
                                {/* /item */}
                                {/* /item */}
                                <div
                                    className="owl-stage-outer owl-height"
                                    style={{ height: "218.667px" }}
                                >
                                    <div
                                        className="owl-stage"
                                        style={{
                                            transform: "translate3d(-2216px, 0px, 0px)",
                                            transition: "all 0s ease 0s",
                                            width: 5173
                                        }}
                                    >
                                        <div className="owl-item cloned" style={{ width: "738.875px" }}>
                                            <div className="item">
                                                <blockquote className="testimonial">
                                                    <p>
                                                        Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                                        dolor sit amet, consectetur adipiscing elit. Donec
                                                        hendrerit vehicula est, in consequat. Donec hendrerit
                                                        vehicula est, in consequat. Donec hendrerit vehicula est,
                                                        in consequat.
                                                    </p>
                                                </blockquote>
                                                <div className="testimonial-arrow-down"></div>
                                                <div className="testimonial-author">
                                                    <div className="img-thumbnail img-thumbnail-small">
                                                        <img src="img/avatar2.jpg"   />
                                                    </div>
                                                    <p>
                                                        <strong>Mark Smith</strong>
                                                        <span>September 2016</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item cloned" style={{ width: "738.875px" }}>
                                            <div className="item">
                                                <blockquote className="testimonial">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                                        dolor sit amet, consectetur adipiscing elit. Donec
                                                        hendrerit vehicula est, in consequat. Donec hendrerit
                                                        vehicula est, in consequat.
                                                    </p>
                                                </blockquote>
                                                <div className="testimonial-arrow-down"></div>
                                                <div className="testimonial-author">
                                                    <div className="img-thumbnail img-thumbnail-small">
                                                        <img src="img/avatar3.jpg"   />
                                                    </div>
                                                    <p>
                                                        <strong>Mark Smith</strong>
                                                        <span>July 2016</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item" style={{ width: "738.875px" }}>
                                            <div className="item">
                                                <blockquote className="testimonial">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                                        dolor sit amet, consectetur adipiscing elit. Donec
                                                        hendrerit vehicula est, in consequat. Donec hendrerit
                                                        vehicula est, in consequat. Donec hendrerit vehicula est,
                                                        in consequat.
                                                    </p>
                                                </blockquote>
                                                <div className="testimonial-arrow-down"></div>
                                                <div className="testimonial-author">
                                                    <div className="img-thumbnail img-thumbnail-small">
                                                        <img src="img/avatar1.jpg"   />
                                                    </div>
                                                    <p>
                                                        <strong>Mark Smith</strong>
                                                        <span>October 2016</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item active" style={{ width: "738.875px" }}>
                                            <div className="item">
                                                <blockquote className="testimonial">
                                                    <p>
                                                        Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                                        dolor sit amet, consectetur adipiscing elit. Donec
                                                        hendrerit vehicula est, in consequat. Donec hendrerit
                                                        vehicula est, in consequat. Donec hendrerit vehicula est,
                                                        in consequat.
                                                    </p>
                                                </blockquote>
                                                <div className="testimonial-arrow-down"></div>
                                                <div className="testimonial-author">
                                                    <div className="img-thumbnail img-thumbnail-small">
                                                        <img src="img/avatar2.jpg"   />
                                                    </div>
                                                    <p>
                                                        <strong>Mark Smith</strong>
                                                        <span>September 2016</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item" style={{ width: "738.875px" }}>
                                            <div className="item">
                                                <blockquote className="testimonial">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                                        dolor sit amet, consectetur adipiscing elit. Donec
                                                        hendrerit vehicula est, in consequat. Donec hendrerit
                                                        vehicula est, in consequat.
                                                    </p>
                                                </blockquote>
                                                <div className="testimonial-arrow-down"></div>
                                                <div className="testimonial-author">
                                                    <div className="img-thumbnail img-thumbnail-small">
                                                        <img src="img/avatar3.jpg"   />
                                                    </div>
                                                    <p>
                                                        <strong>Mark Smith</strong>
                                                        <span>July 2016</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item cloned" style={{ width: "738.875px" }}>
                                            <div className="item">
                                                <blockquote className="testimonial">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                                        dolor sit amet, consectetur adipiscing elit. Donec
                                                        hendrerit vehicula est, in consequat. Donec hendrerit
                                                        vehicula est, in consequat. Donec hendrerit vehicula est,
                                                        in consequat.
                                                    </p>
                                                </blockquote>
                                                <div className="testimonial-arrow-down"></div>
                                                <div className="testimonial-author">
                                                    <div className="img-thumbnail img-thumbnail-small">
                                                        <img src="img/avatar1.jpg"   />
                                                    </div>
                                                    <p>
                                                        <strong>Mark Smith</strong>
                                                        <span>October 2016</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="owl-item cloned" style={{ width: "738.875px" }}>
                                            <div className="item">
                                                <blockquote className="testimonial">
                                                    <p>
                                                        Donec hendrerit vehicula est, in consequat. Lorem ipsum
                                                        dolor sit amet, consectetur adipiscing elit. Donec
                                                        hendrerit vehicula est, in consequat. Donec hendrerit
                                                        vehicula est, in consequat. Donec hendrerit vehicula est,
                                                        in consequat.
                                                    </p>
                                                </blockquote>
                                                <div className="testimonial-arrow-down"></div>
                                                <div className="testimonial-author">
                                                    <div className="img-thumbnail img-thumbnail-small">
                                                        <img src="img/avatar2.jpg"   />
                                                    </div>
                                                    <p>
                                                        <strong>Mark Smith</strong>
                                                        <span>September 2016</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="owl-nav disabled">
                                    <div className="owl-prev">prev</div>
                                    <div className="owl-next">next</div>
                                </div>
                                <div className="owl-dots disabled" />
                            </div>
                            {/* /carousel */}
                        </div>
                        {/* /reviews */}
                        <div className="widget" id="gallery">
                            <h4>gallery</h4>
                            <ul className="magnific-gallery">
                                <li>
                                    <a href="img/gallery/large_1.jpg" title="image title">
                                        <figure>
                                            <img src="img/gallery/thumb_1.jpg" alt="thumb" />
                                        </figure>
                                    </a>
                                </li>
                                <li>
                                    <a href="img/gallery//large_2.jpg" title="image title">
                                        <figure>
                                            <img src="img/gallery/thumb_2.jpg" alt="thumb" />
                                        </figure>
                                    </a>
                                </li>
                                <li>
                                    <a href="img/gallery/large_3.jpg" title="image title">
                                        <figure>
                                            <img src="img/gallery/thumb_3.jpg" alt="thumb" />
                                        </figure>
                                    </a>
                                </li>
                                <li>
                                    <a href="img/gallery/large_4.jpg" title="image title">
                                        <figure>
                                            <img src="img/gallery/thumb_2.jpg" alt="thumb" />
                                        </figure>
                                    </a>
                                </li>
                                <li>
                                    <a href="img/gallery/large_5.jpg" title="image title">
                                        <figure>
                                            <img src="img/gallery/thumb_3.jpg" alt="thumb" />
                                        </figure>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* /gallery */}
                        <div className="widget" id="follow">
                            <h4>follow us</h4>
                            <ul>
                                <li>
                                    <a href="#">
                                        <i className="icon-facebook" />
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="icon-twitter" />
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="icon-google" />
                                        Google plus
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="icon-instagram" />
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* /follow */}
                    </div>
                    {/* /more padding left */}
                </aside>
            </div>
                );
    }
}
