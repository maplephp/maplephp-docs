import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHero() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.logoWrap}>
          <img
            src="/img/logo.svg"
            alt="MaplePHP"
            className={styles.logo}
            width={80}
            height={65}
          />
        </div>
        <h1 className={styles.heroTitle}>MaplePHP</h1>
        <p className={styles.heroTagline}>Your code. Your libraries. Your framework.</p>
        <p className={styles.heroDescription}>
          A high-performance PHP 8.2+ framework built on PSR standards. MVC architecture,
          dependency injection, routing, middleware, and full CLI support — with every
          component swappable.
        </p>
        <div className={styles.heroBadge}>
          <span className={styles.badge}>PHP 8.2+</span>
          <span className={styles.badge}>PSR-compliant</span>
          <span className={styles.badgeWarning}>Beta</span>
        </div>
        <div className={styles.heroActions}>
          <Link className={styles.btnPrimary} to="/docs/getting-started/installation">
            Get started
          </Link>
          <Link className={styles.btnSecondary} to="/docs/intro">
            Read the docs
          </Link>
        </div>
        <div className={styles.heroInstall}>
          <code className={styles.installCmd}>
            composer create-project maplephp/maplephp my-app --stability=beta
          </code>
        </div>
      </div>
    </div>
  );
}

type FeatureItem = {
  title: string;
  description: string;
  items: string[];
};

const features: FeatureItem[] = [
  {
    title: 'PSR-first',
    description: 'Built around PSR standards from the ground up.',
    items: [
      'PSR-7 request and response objects',
      'PSR-11 dependency injection container',
      'PSR-15 middleware pipeline',
      'PSR-3 logging interface',
      'PSR-6 and PSR-16 caching',
    ],
  },
  {
    title: 'Modular architecture',
    description: 'Each maplephp/* package is independently installable.',
    items: [
      'Use only the packages you need',
      'Swap any component with a PSR-compatible alternative',
      'No global state or magic facades',
      'Explicit dependency injection throughout',
      'Works as a full framework or piecemeal',
    ],
  },
  {
    title: 'Full-stack tooling',
    description: 'Web and CLI covered from a single project.',
    items: [
      'FastRoute-based HTTP routing',
      'CLI command system with prompts',
      'Doctrine DBAL query builder',
      'Schema migration runner',
      'Twig template engine',
    ],
  },
];

function FeatureCard({ title, description, items }: FeatureItem) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <ul className={styles.cardList}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <div className={styles.features}>
      <div className={styles.featuresInner}>
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </div>
  );
}

function HomepageQuickstart() {
  return (
    <div className={styles.quickstart}>
      <div className={styles.quickstartInner}>
        <h2 className={styles.sectionTitle}>Quick start</h2>
        <p className={styles.sectionSubtitle}>
          Install, define a route, create a controller, run the dev server.
        </p>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h4>Install the project</h4>
              <pre className={styles.codeBlock}><code>{`composer create-project maplephp/maplephp my-app --stability=beta
cd my-app
./maple serve`}</code></pre>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h4>Define a route</h4>
              <pre className={styles.codeBlock}><code>{`// routers/web.php
$router->get("/hello/{name}", [App\\Controllers\\HelloController::class, "greet"]);`}</code></pre>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h4>Create a controller</h4>
              <pre className={styles.codeBlock}><code>{`namespace App\\Controllers;

use MaplePHP\\Core\\Routing\\DefaultController;
use MaplePHP\\Http\\Interfaces\\PathInterface;
use Psr\\Http\\Message\\ResponseInterface;

class HelloController extends DefaultController
{
    public function greet(ResponseInterface $response, PathInterface $path): ResponseInterface
    {
        $name = $path->select("name")->last();
        $response->getBody()->write("Hello, {$name}!");
        return $response;
    }
}`}</code></pre>
            </div>
          </div>
        </div>
        <div className={styles.quickstartLink}>
          <Link to="/docs/getting-started/installation" className={styles.btnPrimary}>
            Full installation guide →
          </Link>
        </div>
      </div>
    </div>
  );
}

function HomepagePackages() {
  const packages = [
    { name: 'maplephp/core', description: 'HttpKernel, CliKernel, App singleton, router dispatcher, DB, migrations' },
    { name: 'maplephp/http', description: 'PSR-7 ServerRequest, Response, Stream, Uri, HTTP client' },
    { name: 'maplephp/container', description: 'PSR-11 DI container with reflection-based autowiring' },
    { name: 'maplephp/emitron', description: 'PSR-15 middleware dispatcher with built-in handlers' },
    { name: 'maplephp/validate', description: '50+ validators: email, URL, phone, dates, passwords, identity numbers' },
    { name: 'maplephp/cache', description: 'PSR-6 and PSR-16 with FileSystem and Memcached handlers' },
    { name: 'maplephp/log', description: 'PSR-3 logger with StreamHandler (auto-rotation), ErrorLogHandler, DBHandler' },
    { name: 'maplephp/unitary', description: 'Testing framework — 100k+ tests/sec, built-in mocking' },
  ];

  return (
    <div className={styles.packages}>
      <div className={styles.packagesInner}>
        <h2 className={styles.sectionTitle}>Library ecosystem</h2>
        <p className={styles.sectionSubtitle}>
          Every <code>maplephp/*</code> package is independently installable via Composer.
        </p>
        <div className={styles.packageGrid}>
          {packages.map((pkg, i) => (
            <div key={i} className={styles.packageItem}>
              <code className={styles.packageName}>{pkg.name}</code>
              <p className={styles.packageDesc}>{pkg.description}</p>
            </div>
          ))}
        </div>
        <div className={styles.quickstartLink}>
          <Link to="/docs/ecosystem" className={styles.btnSecondary}>
            View full ecosystem →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="High-performance PHP 8.2+ framework built on PSR standards. MVC, DI, routing, middleware, CLI — modular and swappable."
    >
      <main>
        <HomepageHero />
        <HomepageFeatures />
        <HomepageQuickstart />
        <HomepagePackages />
      </main>
    </Layout>
  );
}
