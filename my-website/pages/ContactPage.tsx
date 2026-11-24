// ds-page-plan: docs/plans/pages/GitDemo.md f460651a77168c25310b1c47797c3a27b56436b3a78a99c68758d2512626d7d9
import { Link } from "@/components/Link";
import { Text } from "@/components/Text";
import "./ContactPage.css";

export default function ContactPage() {

  return (<main className="page-Contact"><section className="page-Contact__intro" data-section="intro"><Text key="title" as={"h1"} variant={"title"}>{"Contact"}</Text><Text key="lead" as={"p"}>{"This is a demo page. There is nothing to send."}</Text><Link key="to-home" href={"/"}>{"Back to home"}</Link></section></main>);
}
