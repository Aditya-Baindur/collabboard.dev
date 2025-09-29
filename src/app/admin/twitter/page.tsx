// app/tweet/page.tsx
import TweetEmbed from '@/components/Home/Twitter/TweetEmbed';

export default function TwitterCTA() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <TweetEmbed tweetId="1972495491666710839" />
    </main>
  );
}
