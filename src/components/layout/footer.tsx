export default function Footer() {
  return (
    <div className="sticky bottom-0 z-10 bg-foreground text-xs text-primary-foreground">
      <div className="flex h-7 items-center justify-between overflow-y-hidden px-8">
        <span>Copyright © 2025 SatuCover. All rights reserved.</span>

        <span>{`Version: ${process.env.NEXT_PUBLIC_VERSION}`}</span>
      </div>
    </div>
  );
}
