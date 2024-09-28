import { Card } from "antd";
import Image from "next/image";
import React from "react";
import ArticleImgUrl from "@Image/ArticleImage1.svg";
import Link from "next/link";
export default function ArticleCard({imgUrl}:{imgUrl:string}) {
  return (
    <Card style={{ width: "100%", padding: "0.5%" }}>
      <div>
        <Image src={imgUrl} alt="img" />
      </div>
      <div>November 15, 2022</div>
      <div>10 Top tips for making your Saas product sticky</div>
      <div>
        Conduct regular user research to stay aligned with their evolving
        requirements.Ensure a smooth and intuitive onboarding process to engage
        users from the start. Regularly update features and provide meaningful
        benefits that solve real problems.
      </div>
      <div>
        <Link href={"#"}>Read More</Link>
      </div>
    </Card>
  );
}
