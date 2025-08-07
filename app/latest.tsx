import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";

import { getAllPosts } from "@/lib/api";

export default async function LatestPostPage() {
  const { isEnabled } = await draftMode();
  const allPosts = await getAllPosts(isEnabled);

  if (!allPosts.length) {
    return <p className="text-center mt-20 text-xl">No posts found.</p>;
  }

  // Latest post is the first one (assuming sorted descending by date)
  const latestPost = allPosts[0];

  return (
    <main className="container mx-auto px-5 mt-16">
      <h1 className="text-5xl font-bold mb-12">Latest Post</h1>
      <article>
        <CoverImage
          title={latestPost.title}
          slug={latestPost.slug}
          url={latestPost.coverImage.url}
        />
        <h2 className="mt-8 text-4xl font-semibold leading-tight">
          <Link href={`/posts/${latestPost.slug}`} className="hover:underline">
            {latestPost.title}
          </Link>
        </h2>
        <div className="text-lg mt-2 mb-6">
          <Date dateString={latestPost.date} />
        </div>
        <p className="text-lg leading-relaxed mb-8">{latestPost.excerpt}</p>
        {latestPost.author && (
          <Avatar
            name={latestPost.author.name}
            picture={latestPost.author.picture}
          />
        )}
      </article>
    </main>
  );
}
