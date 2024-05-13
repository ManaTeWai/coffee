import styles from "./page.module.css";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main>
        <div className={styles.banner1}>
          <div className={styles.banner1_img}>
            <div className={styles.wrapper}>
              <div className={styles.banner1_1}>
                <h1 className={styles.title}>Наша кофейня работает с любовью для вас!</h1>
                <Image width={100} height={100} src="/img/coffe1.png" alt="Чашка кофе" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <Image src="/img/zerno1.png" alt="" className={styles.zerno} width={100} height={100} />
          <div className={styles.unit}>
            <div className={styles.unit__section}>
              <Image src="/img/zerno2.png" alt="" className={styles.unit__section__img} width={100} height={100} />
            </div>
            <div className={styles.unit__section}>
              <div className={styles.unit__section__text}>
                <h3 className={styles.unit__section__text__header}>Что наши зерна говорят о качестве?</h3>
                <p className={styles.unit__section__text__paragraph}>Современные технологии достигли такого уровня, что граница обучения кадров требует анализа своевременного выполнения сверхзадачи. Как принято считать, интерактивные прототипы, вне зависимости
                  от их уровня.</p>
              </div>
            </div>
          </div>

          <div className={styles.unit} id="unit_2">
            <div className={styles.unit__section}>
              <div className={styles.unit__section__text}>
                <h3 className={styles.unit__section__text__header}>Почему именно наше кофе?</h3>
                <p className={styles.unit__section__text__paragraph}>Таким образом, высокое качество позиционных исследований предполагает независимые способы реализации прогресса профессионального сообщества. Лишь непосредственные участники технического прогресса.</p>
              </div>
            </div>
            <div className={styles.unit__section}>
              <Image src="/img/coffe2.png" alt="" className={styles.unit__section__img} width={100} height={100} />
            </div>
          </div>

          <div className={styles.guests}>
            <div className={styles.guests__header}>
              <h3>Наши знаменитые гости</h3>
            </div>

            <div className={styles.guests__slider}>
              <div className={styles.adaptivny_slayder}>
                <input type="radio" name="kadoves" id="slaid1" checked />
                <input type="radio" name="kadoves" id="slaid2" />

                <div className={styles.kadoves}>
                  <label className={styles.slaid1}><Image src="/img/leftArrow.png" alt="" width={100} height={100} /></label>

                  <label className={styles.slaid2}><Image src="/img/rightArrow.png" alt="" width={100} height={100} /></label>
                </div>

                <div className={styles.adaptivny_slayder_lasekun}>
                  <div className={styles.abusteku_deagulus}>

                    <div className={styles.slider__unit}>
                      <div className={styles.slider__unit__img}>
                        <Image src="/img/man1.png" width={100} height={100} alt="фото человека" />
                      </div>
                      <div className={styles.slider__unit__text}>
                        <div className={styles.slider__unit__text__paragraph}>
                          <p>Нефедова Валерия Сергеевна</p>
                        </div>
                        <div className={styles.slider__unit__text__header}>
                          <h4>Актриса</h4>
                        </div>
                      </div>
                    </div>

                    <div className={styles.slider__unit}>
                      <div className={styles.slider__unit__img}>
                        <Image src="/img/man2.png" width={100} height={100} alt="фото человека" />
                      </div>
                      <div className={styles.slider__unit__text}>
                        <div className={styles.slider__unit__text__paragraph}>
                          <p>Градов Иван Александрович</p>
                        </div>
                        <div className={styles.slider__unit__text__header}>
                          <h4>Певец</h4>
                        </div>
                      </div>
                    </div>

                    <div className={styles.slider__unit}>
                      <div className={styles.slider__unit__img}>
                        <Image src="/img/man3.png" width={100} height={100} alt="фото человека" />
                      </div>
                      <div className={styles.slider__unit__text}>
                        <div className={styles.slider__unit__text__paragraph}>
                          <p>Жданова Ирина Андреевна</p>
                        </div>
                        <div className={styles.slider__unit__text__header}>
                          <h4>Блоггер</h4>
                        </div>
                      </div>
                    </div>

                    <div className={styles.slider__unit}>
                      <div className={styles.slider__unit__img}>
                        <Image src="/img/man1.png" width={100} height={100} alt="фото человека" />
                      </div>
                      <div className={styles.slider__unit__text}>
                        <div className={styles.slider__unit__text__paragraph}>
                          <p>Нефедова Валерия Сергеевна</p>
                        </div>
                        <div className={styles.slider__unit__text__header}>
                          <h4>Актриса</h4>
                        </div>
                      </div>
                    </div>

                    <div className={styles.slider__unit}>
                      <div className={styles.slider__unit__img}>
                        <Image src="/img/man2.png" width={100} height={100} alt="фото человека" />
                      </div>
                      <div className={styles.slider__unit__text}>
                        <div className={styles.slider__unit__text__paragraph}>
                          <p>Нефедова Валерия Сергеевна</p>
                        </div>
                        <div className={styles.slider__unit__text__header}>
                          <h4>Актриса</h4>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.sale}>
          <div className={styles.wrapper}>
            <div className={styles.sale__unit}>
              <div className={styles.sale__unit__text}>
                <p>Получите скидку 20% на первый заказ</p>
              </div>
              <div className={styles.sale__unit__form}>
                <div className={styles.sale__unit__form__up}>
                  <input type="text" name="" id="" placeholder="Имя" />
                  <input type="text" name="" id="" placeholder="Телефон" />
                </div>
                <div className={styles.sale__unit__form__down}>
                  <input type="button" value="Получить" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
