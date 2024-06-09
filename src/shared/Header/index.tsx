import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { theme, Typography } from "antd";
import BurderIcon from "../../assets/Icons/BurderIcon";
import { useUnit } from "effector-react";
import { $user, logout } from "../../entities/user/model/index";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

const { Title } = Typography;
const { useToken } = theme;

const Header: FC<{ title?: string }> = ({ title }) => {

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const [user] = useUnit([$user])
  const isUserExist = user?.accessToken
  const { token } = useToken();

  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        setIsOpenMenu(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

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
    <div className={styles['header']}>
      <div className={styles['headerMain']}>
        <Title
          level={3}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: '5px 10px',
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: 10,
            fontWeight: 200
          }}
        >
          {title || 'Авторизация'}
        </Title>
        {
          isUserExist &&
          <div
              className={styles['headerBurger']}
              onClick={() => setIsOpenMenu(true)}
          >
              <BurderIcon />
          </div>
        }
      </div>

      <div
        ref={ref}
        className={styles['headerNav']}
        style={{
          visibility: isOpenMenu ? "visible" : 'hidden',
          opacity: isOpenMenu ? 1 : 0,
          transform: isOpenMenu ? 'translateX(0)' : 'translateX(200px)'
        }}
      >
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

    </div>
  );
};

export default Header;
