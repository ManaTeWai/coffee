import { Htag, P, JobRequest } from "@/components"

export default function RequestPage() {
    return (
        <div>
            <Htag tag='h1'>Заявка</Htag>
            <P>Здесь будет форма для отправки заявки</P>
            <JobRequest />
        </div>
    )
}