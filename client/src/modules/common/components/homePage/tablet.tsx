import * as React from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import TodoTab from "./tabletComponents/TabletTodo";
import TodoService from "../../../services/todo.service";
import ITodo from "../../../models/Todo";
import { APP_KEYS } from "../../consts";
import { SPACES } from "../../../theme";
import { useNavigate } from "react-router-dom";

const TabletTodos = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("JWT") === "") {
    navigate(APP_KEYS.ROUTER_KEYS.AUTH);
  }
  const { data, isLoading, error } = useQuery<ITodo[], Error>(
    APP_KEYS.QUERY_KEYS.TODOS,
    async () => {
      const todoService = new TodoService();
      const todos = await todoService.getAll();
      return todos;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div style={{ paddingTop: SPACES.paddingTop }}>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination
        modules={[EffectCoverflow, Pagination]}
        wrapperClass="todoSlider"
        className="mySwiper"
      >
        {data?.map((todo) => (
          <SwiperSlide>
            <TodoTab {...todo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TabletTodos;
