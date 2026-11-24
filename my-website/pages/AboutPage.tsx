// ds-page-plan: docs/plans/pages/GitDemo.md f460651a77168c25310b1c47797c3a27b56436b3a78a99c68758d2512626d7d9
import { Link } from "@/components/Link";
import { Text } from "@/components/Text";
import "./AboutPage.css";

export default function AboutPage() {

  return (<main className="page-About"><section className="page-About__intro" data-section="intro"><Text key="title" as={"h1"} variant={"title"}>{"About this demo"}</Text><Text key="lead" as={"p"}>{"Change a word on this page, commit it, and watch the live site update."}</Text><Link key="to-home" href={"/"}>{"Back to home"}</Link></section></main>);
}
