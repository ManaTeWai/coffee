'use client'

import { Htag, P } from "../"
import styles from "./ReviewItem.module.css"
import Image from "next/image"
import * as motion from "motion/react-client"
import { useEffect, useState, useContext } from "react"
import { supabase } from "@/utils/supabase"

const avatarPaths = {
    man: "/img/man.jpg",
    woman: "/img/woman.jpg",
}

export const ReviewItem = () => {
	const [reviewItems, setReviewItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const { data, error } = await supabase
                    .from("Reviews")
                    .select("*")
                    .order("id", { ascending: true })

                if (error) {
                    console.error("Ошибка загрузки данных:", error)
                } else {
                    setReviewItems(data || [])
                }
            } catch (error) {
                console.error("Ошибка при выполнении запроса:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchCards()
    }, [])

    return (
        <div className={styles.reviews}>
			{reviewItems.map((item, index) => (
                <motion.div
                    className={styles.reviewbox}
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                >
                    <motion.div
                        className={styles.review}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 + 0.1 }}
                    >
                        <Image
                            src={avatarPaths[item.ImageType as "man" | "woman"]}
                            width={100}
                            height={100}
                            alt={item.author}
                        />
                        <div className={styles.text}>
                            <Htag tag='h1'>{item.author}</Htag>
                            <P size='medium'>{item.text}</P>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}
