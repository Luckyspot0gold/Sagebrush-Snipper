import Image from "next/image"
import styles from "./newspaper-layout.module.css"

export default function NewspaperLayout() {
  return (
    <div className={styles.newspaper}>
      <header>
        <h1>The Daily Chronicle</h1>
        <p>Your source for news, opinions, and more.</p>
      </header>

      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">World</a>
          </li>
          <li>
            <a href="#">Politics</a>
          </li>
          <li>
            <a href="#">Business</a>
          </li>
          <li>
            <a href="#">Technology</a>
          </li>
          <li>
            <a href="#">Sports</a>
          </li>
          <li>
            <a href="#">Entertainment</a>
          </li>
        </ul>
      </nav>

      <main>
        <article>
          <h2>Breaking News: Local Bakery Wins National Award</h2>
          <div className={styles.imageContainer}>
            <Image src="/images/bakery.jpg" alt="Award-winning bakery" width={600} height={400} fetchPriority="high" />
          </div>
          <p>
            The Sweet Surrender bakery has been awarded the prestigious Golden Whisk award for their innovative pastries
            and commitment to quality ingredients.
          </p>
          <p>
            The bakery, located in the heart of downtown, has been a local favorite for over 20 years. Their signature
            croissant and decadent chocolate cake are known throughout the region.
          </p>
          <p>
            "We are incredibly honored to receive this award," said owner Emily Carter. "It's a testament to the hard
            work and dedication of our amazing team."
          </p>
        </article>

        <article>
          <h2>City Council Approves New Park Development</h2>
          <div className={styles.imageContainer}>
            <Image src="/images/park.jpg" alt="Proposed park design" width={600} height={400} fetchPriority="high" />
          </div>
          <p>The City Council has unanimously approved the development of a new public park on the city's west side.</p>
          <p>
            The park, which will be named Harmony Park, will feature walking trails, a playground, a community garden,
            and a performance stage.
          </p>
          <p>
            "This park will be a valuable asset to our community," said Mayor David Miller. "It will provide a space for
            residents to relax, exercise, and connect with nature."
          </p>
        </article>

        <article>
          <h2>Local Artist Unveils Stunning New Mural</h2>
          <div className={styles.imageContainer}>
            <Image src="/images/mural.jpg" alt="Newly unveiled mural" width={600} height={400} fetchPriority="high" />
          </div>
          <p>Local artist Sarah Johnson has unveiled a stunning new mural on the side of the historic Grand Theater.</p>
          <p>
            The mural, which depicts scenes from the city's history, is a vibrant and colorful addition to the downtown
            landscape.
          </p>
          <p>
            "I wanted to create a piece of art that would celebrate our city's rich heritage," said Johnson. "I hope it
            will inspire people to learn more about our history and appreciate the beauty of our community."
          </p>
        </article>
      </main>

      <aside>
        <section>
          <h3>Top Stories</h3>
          <ul>
            <li>
              <a href="#">Stock Market Reaches Record High</a>
            </li>
            <li>
              <a href="#">New Study Links Exercise to Improved Mental Health</a>
            </li>
            <li>
              <a href="#">Local School District Announces New Superintendent</a>
            </li>
          </ul>
        </section>

        <section>
          <h3>Weather</h3>
          <p>Today: Sunny with a high of 75°F.</p>
          <p>Tomorrow: Partly cloudy with a chance of rain.</p>
        </section>

        <section>
          <h3>Advertisement</h3>
          <p>Visit our sponsor: Acme Corp.</p>
        </section>
      </aside>

      <footer>
        <p>&copy; 2023 The Daily Chronicle</p>
      </footer>
    </div>
  )
}
