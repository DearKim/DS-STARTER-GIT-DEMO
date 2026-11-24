// ds-page-plan: docs/plans/pages/GitDemo.md f460651a77168c25310b1c47797c3a27b56436b3a78a99c68758d2512626d7d9
import { Link } from "@/components/Link";
import { Text } from "@/components/Text";
import "./HomePage.css";

export default function HomePage() {

  return (<main className="page-Home"><section className="page-Home__intro" data-section="intro"><Text key="title" as={"h1"} variant={"title"}>{"Git demo site"}</Text><Text key="lead" as={"p"}>{"This site shows each step from a commit to a live address."}</Text><Link key="to-about" href={"/about"}>{"About this demo"}</Link><Link key="to-contact" href={"/contact"}>{"Contact"}</Link></section></main>);
}
