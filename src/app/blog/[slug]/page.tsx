import { formatDate } from "@/lib/format-date";
import asset from "@/assets/pixel.jpg";
import { Badge } from "@aomdev/ui";
import Image from "next/image";
import { TableOfContents } from "./_components/toc";
import { Author } from "./_components/author";
import { ShareMedia } from "./_components/share-media";
import { Newsletter } from "./_components/newsletter";
import { Title } from "@aomdev/ui";

export default function Page() {
  return (
    <>
      <div className="mb-16 lg:mb-20 mt-16  gap-7 w-11/12 lg:w-4/5 mx-auto">
        <Badge color={"error"} size={"md"} className="mb-4">
          Product update
        </Badge>
        <div>
          <article className="lg:mb-16">
            <div className="mb-10">
              <header className=" mb-4">
                <h1
                  className={"text-4xl mb-5 lg:text-6xl leading-none text-gray-900 font-medium font-heading"}
                >
                  Introducing SXM Quiz
                </h1>
              </header>
              <span className="text-gray-600 font-medium text-sm block mb-6">
                {formatDate(new Date())} - {2} min read
              </span>
              <p
                style={{ width: "clamp(36ch, 90%, 75ch)" }}
                className="text-lg lg:text-xl mb-4 leading-relaxed"
              >
                Culpa duis ullamco dolore officia sunt fugiat magna ad nisi anim. Deserunt nostrud laborum
                excepteur laborum aute veniam irure in magna nisi laborum in nisi. Sit et reprehenderit
                aliquip consectetur id qui enim ex velit fugiat reprehenderit adipisicing velit.
              </p>
            </div>
            <Image priority src={asset} alt={""} className={"rounded-xl mb-10"} />
            <div className="flex lg:flex-row lg:gap-0 gap-4 flex-col lg:items-end lg:justify-between mb-12 lg:mb-16">
              <Author />
              <ShareMedia />
            </div>
            <div className="flex ">
              <div className="basis-3/4">
                <p
                  style={{ width: "clamp(36ch, 90%, 75ch)" }}
                  className="text-lg text-gray-700 leading-loose mb-12"
                >
                  Reprehenderit nulla culpa deserunt ipsum officia. Sunt in nisi irure culpa Lorem nulla
                  ullamco irure. Cupidatat officia velit magna eiusmod fugiat tempor qui in voluptate aute.
                  Officia elit ullamco eiusmod ullamco adipisicing voluptate ad incididunt. Id nostrud aute
                  sint aute.
                </p>
                <Title id={"how-it-started"} order={2} className="font-heading font-medium mb-4">
                  How it started
                </Title>
                <p
                  style={{ width: "clamp(36ch, 90%, 75ch)" }}
                  className="text-lg text-gray-700 leading-loose mb-12"
                >
                  Nulla officia ex eu culpa voluptate sunt voluptate mollit deserunt. Adipisicing qui nisi
                  laboris officia culpa sunt deserunt duis commodo ea pariatur irure. Ea incididunt
                  reprehenderit deserunt reprehenderit pariatur ipsum. Voluptate mollit laborum aliqua commodo
                  qui proident tempor proident magna sint dolore reprehenderit amet quis. Labore esse labore
                  et nulla cillum sint ex. Officia ea excepteur fugiat sint pariatur laborum do. Nulla officia
                  ex eu culpa voluptate sunt voluptate mollit deserunt. Adipisicing qui nisi laboris officia
                  culpa sunt deserunt duis commodo ea pariatur irure. Ea incididunt reprehenderit deserunt
                  reprehenderit pariatur ipsum. Voluptate mollit laborum aliqua commodo qui proident tempor
                  proident magna sint dolore reprehenderit amet quis. Labore esse labore et nulla cillum sint
                  ex. Officia ea excepteur fugiat sint pariatur laborum do.
                </p>
                <Title id={"features"} order={2} className="font-heading font-medium mb-4">
                  Features
                </Title>
                <p
                  style={{ width: "clamp(36ch, 90%, 75ch)" }}
                  className="text-lg text-gray-700 leading-loose mb-2"
                >
                  Qui reprehenderit cupidatat incididunt consectetur laborum in nisi quis. Dolore sint aliqua
                  voluptate laborum dolore culpa consectetur officia. Excepteur irure adipisicing eu
                  reprehenderit eu occaecat sit. Exercitation id commodo in amet magna culpa laboris quis est
                  ullamco labore ea id. Commodo veniam dolor aliqua elit qui sint eiusmod proident. Aute est
                  sit in non cillum. Reprehenderit veniam commodo labore ipsum tempor minim in aliqua
                  proident. Laborum aute deserunt enim aute elit. Quis consequat ad dolore mollit anim mollit
                  ea voluptate eu reprehenderit qui ut cupidatat consectetur. Amet esse magna esse adipisicing
                  reprehenderit do occaecat sit aliquip non incididunt sint do officia.
                </p>
                <ul className="list-disc ml-4 text-lg mb-2 text-gray-700 space-y-2">
                  <li>Commodo veniam dolor aliqua</li>
                  <li>Commodo veniam dolor aliqua</li>
                  <li>Commodo veniam dolor aliqua</li>
                </ul>
                <p
                  style={{ width: "clamp(36ch, 90%, 75ch)" }}
                  className="text-lg text-gray-700 leading-loose mb-12"
                >
                  In elit elit occaecat ad adipisicing sunt Lorem culpa pariatur. Incididunt sit veniam
                  excepteur mollit minim. Sit irure est proident duis quis tempor nisi eiusmod laborum duis
                  cillum anim. Fugiat reprehenderit deserunt pariatur aute voluptate magna adipisicing nostrud
                  Lorem culpa occaecat. Sit culpa mollit cillum cupidatat consequat quis sit esse minim
                  occaecat commodo. Veniam sint ex cillum fugiat ex eiusmod. Ex deserunt do laboris tempor
                  pariatur irure reprehenderit dolor ut irure.
                </p>
                <Title id={"whats-next"} order={2} className="font-heading font-medium mb-4">
                  What&apos;s next
                </Title>
                <p
                  style={{ width: "clamp(36ch, 90%, 75ch)" }}
                  className="text-lg text-gray-700 leading-loose "
                >
                  Aute officia exercitation ex labore excepteur sit eu cupidatat qui eiusmod amet. Elit amet
                  ea aute dolore veniam quis sunt ex veniam ea tempor. Irure nisi eiusmod duis consequat ipsum
                  sunt esse nisi est qui consectetur tempor eiusmod eu. Exercitation exercitation voluptate
                  voluptate amet esse sint laboris in adipisicing in amet ad. Proident aliqua anim dolore id
                  consectetur enim.
                </p>
              </div>
              <TableOfContents />
            </div>
          </article>
        </div>
      </div>
      <Newsletter />
    </>
  );
}
