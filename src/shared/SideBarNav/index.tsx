import React from 'react';
import styles from './style.module.scss';
import { Link, useLocation } from "react-router-dom";
import { theme, Typography } from "antd";
import { logout } from "../../entities/user/model/index";
import logo from '../../assets/images/logo.jpg'

const { useToken } = theme;
const { Title } = Typography;


const SideBarNav = () => {

  const location = useLocation()
  const { token } = useToken();

  const mainNav = [
    {
      title: 'Инвентарь',
      link: '/equipments',
    },
    {
      title: 'Категории',
      link: '/categories',
    },
    {
      title: 'Теги',
      link: '/tags',
    },
    {
      title: 'Пользователи',
      link: '/users',
    },
    {
      title: 'История',
      link: '/history',
    },
  ]

  return (
    <div className={styles.bar}>
      <div className={styles.barWrap}>
        <div className={styles.mainNav}>
          {
            mainNav?.map((item: any) =>
              <Link to={item.link}>
                <Title
                  level={5}
                  style={{
                    color: location.pathname?.includes(item.link)
                      ? token.colorPrimary
                      : token.colorText,
                    fontWeight: 400
                  }}
                >
                  {item?.title}
                </Title>
              </Link>
            )
          }
        </div>

        <div className={styles.logout} onClick={() => logout()}>
          <button>
            Выйти
          </button>
        </div>

        </div>
    </div>
  );
};

export default SideBarNav;
