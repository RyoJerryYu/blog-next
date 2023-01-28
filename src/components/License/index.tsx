import Image from "next/image";
import Link from "next/link";

type LicenseProps = {};

export default function License({}: LicenseProps) {
  return (
    <>
      <span>
        <Link
          rel="license"
          href="http://creativecommons.org/licenses/by-nc/4.0/"
        >
          <Image
            alt="Creative Commons License"
            style={{ borderWidth: "0" }}
            width={88}
            height={31}
            src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
          />
        </Link>
        <div>
          This work is licensed under a{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc/4.0/"
          >
            Creative Commons Attribution-NonCommercial 4.0 International License
          </a>
          .
        </div>
      </span>
    </>
  );
}
