import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";

import { getAllPosts } from "@/lib/api";

export default async function LatestPostsPage() {
  const { isEnabled } = await draftMode();
  const allPosts = await getAllPosts(isEnabled);

  if (!allPosts.length) {
    return <p className="text-center mt-20 text-xl">No posts found.</p>;
  }

  // Take the first two latest posts
  const latestTwoPosts = allPosts.slice(0, 2);

  return (
    <main className="container mx-auto px-5 mt-16">
      <h1 className="text-5xl font-bold mb-12">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {latestTwoPosts.map((post) => (
          <article key={post.slug}>
            <CoverImage
              title={post.title}
              slug={post.slug}
              url={post.coverImage.url}
            />
            <h2 className="mt-8 text-4xl font-semibold leading-tight">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <div className="text-lg mt-2 mb-6">
              <Date dateString={post.date} />
            </div>
            <p className="text-lg leading-relaxed mb-8">{post.excerpt}</p>
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
