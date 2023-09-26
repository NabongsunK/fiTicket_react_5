import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import TicketDetailItem from "./TicketDetailItem";

import { push, pop } from "../../store/cartSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

axios.defaults.baseURL = "http://localhost:4400/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "70vh",
    width: "50vw",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "50px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 3)",
    backdropFilter: "sepia(90%)",
  },
};

const TicketListItem = function (props) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // 이미지를 보이거나 숨기기 위한 상태 추가
  const appElement = document.getElementById("root");
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.myCartSlice.myCarts);

  if (appElement) {
    Modal.setAppElement(appElement);
  } else {
    console.error("App element not found!");
  }

  function openModal() {
    setIsOpen(!modalIsOpen);
  }

  const toCart = function () {
    dispatch(
      push({
        ticket: {
          badge: props.festival.addr1 + " " + props.festival.addr2,
          name: props.festival.title,
          quantity: 1,
          price: props.festival.id,
          image: props.festival.first_image2,
          ticket_id: props.festival.id,
          index: myCart.length,
        },
      })
    );
  };

  const img = props.festival.first_image2;
  const poster =
    props.festival.first_image2 === "" ? (
      <Link to={`/explore/${props.id}`}>
        <div
          className="image"
          style={{
            backgroundImage: "url('/assets/images/fes_default.jpg')",
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
          }}
        ></div>
      </Link>
    ) : (
      <Link to={`/explore/${props.festival.id}`}>
        <div
          className="image"
          style={{
            backgroundImage: `url("${img}")`,
            width: "100%",
            height: "100%",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </Link>
    );

  return (
    <div className="col-lg-6 col-sm-3">
      <div className="item">
        <div className="row">
          <div className="col-lg-4">{poster}</div>
          <div
            className="col-lg-6 align-self-center"
            onClick={openModal}
            style={{ cursor: "pointer" }}
          >
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={openModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <TicketDetailItem
                festival={props.festival}
                openModal={openModal}
                toCart={toCart}
              />
            </Modal>
            <div className="content">
              <span className="info">
                *D-{props.festival.d_day}
                끝나요
                {isVisible && (
                  <img
                    src="/assets/images/good.jpg"
                    alt="Good"
                    style={{ width: "30px" }}
                  />
                )}
              </span>
              <h4>{props.festival.title}</h4>
              <div className="row">
                <div className="col-12">
                  <i className="fa fa-clock"></i>
                  <span className="list">
                    {props.festival.event_start_date} ~{" "}
                    {props.festival.event_end_date}
                  </span>
                </div>
              </div>
              <p>
                {props.festival.over_view.substring(0, 38)}
                {props.festival.over_view.length > 38 ? ". . ." : ""}
              </p>
            </div>
          </div>
          <div className="col-lg-2 align-self-center">
            <div className="explore_list_button">
              <Link to={props.festival.home_page} target="_blank">
                <i className="fa fa-home"></i>
              </Link>
            </div>
            <div className="explore_list_button" onClick={toCart}>
              <Link onClick={props.alertHandler}>
                <i className="fa fa-cart-plus"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketListItem;
