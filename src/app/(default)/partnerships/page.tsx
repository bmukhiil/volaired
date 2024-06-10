import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Partnerships() {
  return (
    <div className="flex flex-col p-6 pt-12 gap-y-12">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight">
          Partner with Radiair
        </h1>
        <p className="mt-2 text-muted-foreground">
          Join us in revolutionizing the travel experience with innovative
          solutions and seamless integration.
        </p>
        <Button className="mt-4">Join us</Button>
      </div>
      <Separator />
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Why Partner with Radiair?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Radiair is committed to enhancing the travel experience through
          cutting-edge technology and innovative solutions. By partnering with
          us, you can:
        </p>
        <ul>
          <li>Collaborate on cutting-edge travel technology.</li>
          <li>Access a growing user base and increase visibility.</li>
          <li>Enhance your offerings with Radiair’s unique features.</li>
          <li>Benefit from dedicated support and joint marketing efforts.</li>
        </ul>
      </div>
      <div className="section">
        <h2 className="font-bold tracking-tight text-3xl">Who Can Partner?</h2>
        <p className="mt-2 text-muted-foreground">
          We welcome partnerships from:
        </p>
        <ul>
          <li>Airlines</li>
          <li>Hotels and Accommodations</li>
          <li>Travel Agencies</li>
          <li>Technology Providers</li>
        </ul>
      </div>

      <div className="section">
        <h2 className="font-bold tracking-tight text-3xl">Success Stories</h2>
        <p>
          Our existing partners have seen significant benefits from
          collaborating with Radiair. Read their testimonials and case studies
          below:
        </p>
        {/* <!-- Add testimonials or case studies here --> */}
      </div>

      <div className="section">
        <h2 className="text-3xl font-bold tracking-tight">
          Partnership Opportunities
        </h2>
        <p className="text-muted-foreground mt-2">
          Explore the various ways we can work together:
        </p>
        <ul>
          <li>Co-Marketing Campaigns</li>
          <li>API Integration</li>
          <li>Data Collaboration</li>
          <li>Special Projects</li>
        </ul>
      </div>

      {/* <div className="section contact-form">
        <h2>Get in Touch</h2>
        <p>Ready to partner with Radiair? Let's revolutionize travel together.</p>
        <form action="/submit-partnership" method="post">
            <input type="text" name="name" placeholder="Your Name" required>
            <input type="text" name="company" placeholder="Your Company" required>
            <input type="email" name="email" placeholder="Your Email" required>
            <input type="tel" name="phone" placeholder="Your Phone Number" required>
            <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
            <button type="submit">Submit</button>
        </form>
    </div> */}
    </div>
  );
}
