import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Carousel,
  Col,
  Row,
  Card,
  Modal,
  Form,
  Checkbox,
  Input,
  Anchor,
  Drawer,
  BackTop,
} from "antd";

import "./Landing.css";
import image1 from "../../assets/images/modern-design.jpg";
import image2 from "../../assets/images/clean-design.jpg";
import image3 from "../../assets/images/great-support.jpg";
import image4 from "../../assets/images/easy-customise.jpg";
import image5 from "../../assets/images/unlimited-features.jpg";
import image6 from "../../assets/images/advanced-option.jpg";
import { useSelector } from "react-redux";

const { Meta } = Card;
const { TextArea } = Input;

const items = [
  {
    key: "1",
    title: "Web and mobile payment built for developers",
    content:
      "An vim odio ocurreret consetetur, justo constituto ex mea. Quidam facilisis vituperata pri ne. Id nostrud gubergren urbanitas sed, quo summo animal qualisque ut, cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
  {
    key: "2",
    title: "Work better together. Schedule meetings",
    content:
      "An vim odio ocurreret consetetur, justo constituto ex mea. Quidam facilisis vituperata pri ne. Id nostrud gubergren urbanitas sed, quo summo animal qualisque ut, cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
  {
    key: "3",
    title: "The best app to increase your productivity",
    content:
      "An vim odio ocurreret consetetur, justo constituto ex mea. Quidam facilisis vituperata pri ne. Id nostrud gubergren urbanitas sed, quo summo animal qualisque ut, cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
];

const itemsAbout = [
  {
    key: "1",
    icon: <i className="fas fa-chart-pie"></i>,
    title: "High Performance",
    content:
      "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
  {
    key: "2",
    icon: <i className="fas fa-desktop"></i>,
    title: "Flat Design",
    content:
      "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
  {
    key: "3",
    icon: <i className="fas fa-database"></i>,
    title: "Simplified Workflow",
    content:
      "cu nostro dissentias consectetuer mel. Ut admodum conceptam mei, cu eam tation fabulas abhorreant. His ex mandamus.",
  },
];

const itemsFeature = [
  {
    key: "1",
    image: image1,
    title: "Modern Design",
  },
  {
    key: "2",
    image: image2,
    title: "Modern Design",
  },
  {
    key: "3",
    image: image3,
    title: "Modern Design",
  },
  {
    key: "4",
    image: image4,
    title: "Modern Design",
  },
  {
    key: "5",
    image: image5,
    title: "Modern Design",
  },
  {
    key: "6",
    image: image6,
    title: "Modern Design",
  },
];

export default function Landing() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const handleLogin = () => {
    if (isLoggedIn) {
      history.push("/dashboard");
    } else {
      history.push("/sign-in");
    }
  }
  
  const { Link } = Anchor;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="main">
      <div className="mainLayout">
        <header className="header-landing">
          <div className="container-fluid">
            <div className="header">
              <div className="logo">
                <i className="fas fa-bolt"></i>
                <a href="/">Learn</a>
              </div>

              <div className="mobileVisible">
                <Button type="primary" onClick={showDrawer}>
                  <i className="fas fa-bars"></i>
                </Button>
                <Drawer
                  title="Menu"
                  placement="right"
                  closable={false}
                  onClose={onClose}
                  visible={visible}
                >
                  <Anchor targetOffset="65">
                    <Link href="#hero" title="Home" />
                    <Link href="#about" title="About" />
                    <Link href="#feature" title="Features" />
                    <Link href="#works" title="How it works" />
                    <Link href="#faq" title="FAQ" />
                    <Link href="#pricing" title="Pricing" />
                    <Link href="#contact" title="Contact" />
                  </Anchor>
                </Drawer>
              </div>

              <div className="mobileHidden">
                <Anchor targetOffset="65">
                  <Link href="#hero" title="Home" />
                  <Link href="#about" title="About" />
                  <Link href="#feature" title="Features" />
                  <Link href="#works" title="How it works" />
                  <Link href="#faq" title="FAQ" />
                  <Link href="#pricing" title="Pricing" />
                  <Link href="#contact" title="Contact" />
                </Anchor>
              </div>
            </div>
          </div>
        </header>
        <div id="hero" className="heroBlock">
          <Carousel afterChange={onChange}>
            {items.map((item) => {
              return (
                <div className="container-fluid" key={item.key}>
                  <div className="content">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                    <div className="btnHolder">
                      <Button type="primary" size="large" onClick={handleLogin}>
                        {isLoggedIn ? "Dashboard" : "Login"}
                      </Button>
                      <Button size="large">
                        <i className="fas fa-desktop"></i> Watch a Demo
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
        <div id="about" className="block aboutBlock">
          <div className="container-fluid">
            <div className="titleHolder">
              <h2>About Us</h2>
              <p>dolor sit amet, consectetur adipisicing elit</p>
            </div>
            <div className="contentHolder">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                necessitatibus officiis repudiandae est deserunt delectus
                dolorem iure porro distinctio fuga, nostrum doloremque. Facilis
                porro in laborum dolor amet ratione hic? Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Magnam aut a porro, adipisci{" "}
              </p>
            </div>
            <Row gutter={[16, 16]}>
              {itemsAbout.map((item) => {
                return (
                  <Col md={{ span: 8 }} key={item.key}>
                    <div className="content">
                      <div className="icon">{item.icon}</div>
                      <h3>{item.title}</h3>
                      <p>{item.content}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <div id="feature" className="block aboutBlock">
          <div className="container-fluid">
            <div className="titleHolder">
              <h2>Key Features and Benefits</h2>
              <p>
                Obcaecati consequatur libero repudiandae, aperiam itaque
                laborum!
              </p>
            </div>
            <Row gutter={[16, 16]}>
              {itemsFeature.map((item) => {
                return (
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 12 }}
                    md={{ span: 8 }}
                    key={item.key}
                  >
                    <Card
                      hoverable
                      cover={<img alt={item.title} src={item.image} />}
                    >
                      <Meta title={item.title} />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <div id="works" className="block worksBlock">
          <div className="container-fluid">
            <div className="titleHolder">
              <h2>How it works</h2>
              <p>
                Perspiciatis vero similique, ut ducimus modi ipsam autem tempora
              </p>
            </div>
            <div className="contentHolder">
              <Button size="large" onClick={showModal}>
                <i className="fas fa-play"></i>
              </Button>
            </div>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <iframe
                title="Woocommerce Tutorial"
                width="100%"
                height="350"
                src="https://www.youtube.com/embed/8f8_JYIzOno?list=PLiUrl-SQRR7LQINGQGE99pXWDuKq4SxfU"
              ></iframe>
            </Modal>
          </div>
        </div>
        <div id="contact" className="block contactBlock ">
          <div className="container-fluid">
            <div className="titleHolder">
              <h2>Get in Touch</h2>
              <p>
                Obcaecati consequatur libero repudiandae, aperiam itaque
                laborum!
              </p>
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: false }}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="fullname"
                rules={[
                  { required: true, message: "Please input your Full name!" },
                ]}
              >
                <Input placeholder="Full name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="subject"
                rules={[
                  { required: true, message: "Please input your subject!" },
                ]}
              >
                <Input type="text" placeholder="Subject" />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please input your message!" },
                ]}
              >
                <TextArea rows={5} placeholder="Message" />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Sumit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <footer className="footer-landing">
          <div className="container-fluid">
            <div className="footer">
              <div className="logo">
                <i className="fas fa-bolt"></i>
                <a href="/">Learn Online</a>
              </div>

              <ul className="socials">
                <li>
                  <a href="https://www.facebook.com/">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.pinterest.com/">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
              <div className="copyright">Copyright © 2020 Learn Online</div>
              <BackTop>
                <div>
                  <i
                    style={{ color: "deeppink" }}
                    className="fas fa-arrow-circle-up"
                  ></i>
                </div>
              </BackTop>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
