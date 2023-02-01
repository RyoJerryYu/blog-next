import Image from "next/image";
import Link from "next/link";

type LicenseProps = {};

export default function License({}: LicenseProps) {
  return (
    <>
      <div className="w-96 text-gray-700">
        <span className="!text-sm">
          <Link
            className="!inline-block !p-0 !m-0 align-text-bottom"
            rel="license"
            href="http://creativecommons.org/licenses/by-nc/4.0/"
          >
            <Image
              className="!m-0 h-4 w-auto pr-1"
              alt="Creative Commons License"
              style={{ borderWidth: "0" }}
              width={88}
              height={31}
              src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
            />
          </Link>
          This work is licensed under a{" "}
          <a
            className="underline"
            rel="license"
            href="http://creativecommons.org/licenses/by-nc/4.0/"
          >
            Creative Commons Attribution-NonCommercial 4.0 International License
          </a>
          .
        </span>
      </div>
    </>
  );
}
