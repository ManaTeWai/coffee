import { Htag, P, JobRequest } from "@/components";
import { Metadata } from "next";
import styles from "@/app/page.module.css";

export const metadata: Metadata = {
    title: "Кофе Тайм || Заявка на работу",
};

export default function jobrequest() {
    return (
        <div>
            <Htag tag='h1'>Заявка</Htag>
            <P>Здесь будет форма для отправки заявки</P>
            <JobRequest />
        </div>
    );
};