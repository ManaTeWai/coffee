"use client";

import styles from "./Footer.module.css";
import { FooterProps } from "./Footer.Props";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { P, Htag, Button } from "../";

import type { JSX } from "react";

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <div className={styles.footer_cont}>
      <div className={styles.footer}>
        <div className={styles.footerLogo}>
          <P size="large" className={styles.logo}>
            КофеТайм
          </P>
        </div>
        <div className={styles.footer_menu}>
          <ul className={styles.menu}>
            <li className={styles.li}>
              <Htag tag="h3" className={styles.menu_header}>
                КофеТайм
              </Htag>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/about">
                О нас
              </Link>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/career">
                Карьера
              </Link>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/business">
                Для бизнеса
              </Link>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/franchising">
                Франчайзинг
              </Link>
            </li>
          </ul>
          <ul className={styles.menu}>
            <li className={styles.li}>
              <Htag tag="h3" className={styles.menu_header}>
                Клиентам
              </Htag>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/event">
                Акции
              </Link>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/bonuses">
                Бонусы
              </Link>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/priceListPage">
                Прейскурант
              </Link>
            </li>
          </ul>
          <ul className={styles.menu}>
            <li className={styles.li}>
              <Htag tag="h3" className={styles.menu_header}>
                Помощь
              </Htag>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/zonesAndDeliver">
                Зоны и условия доставки
              </Link>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/restaurants">
                Рестораны
              </Link>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} href="/contacts">
                Контакты
              </Link>
            </li>
          </ul>

          <div>
            <Htag tag="h3" className={styles.menu_header}>
              Мы в социальных сетях
            </Htag>
            <div className={styles.social}>
              <Link
                href="https://vk.com/manatewai"
                className={styles.socials_item}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socials_item_icon}
                >
                  <use href="./img/social.svg#i-vk"></use>
                </svg>
              </Link>
              <Link
                href="https://t.me/manatewai"
                className={styles.socials_item}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socials_item_icon}
                >
                  <use href="./img/social.svg#i-tg"></use>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <P size="large">
            © 2022 - {format(new Date(), "yyyy")} КофеТайм. Все права защищены.
          </P>
          <P size="large">
            <Link className={styles.link} href="/policy">
              Политика конфиденциальности
            </Link>
          </P>
        </div>
      </div>
    </div>
  );
};
