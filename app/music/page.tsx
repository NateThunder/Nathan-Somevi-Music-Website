import MusicAlbumTimeline from "@/components/MusicAlbumTimeline";
import styles from "./music.module.css";

export default function MusicPage() {
  return (
    <section className={styles.page}>
      <div className={styles.section}>
        <header className={styles.heading}>
          <p className={styles.kicker}>Discography</p>
        </header>

        <MusicAlbumTimeline />
      </div>
    </section>
  );
}
