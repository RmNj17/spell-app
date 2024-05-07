import { Helmet, HelmetProvider } from "react-helmet-async";

interface PageHelmetProps {
  title: string;
}

export default function PageHelmet({ title }: PageHelmetProps) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Spell Book | {title}</title>
      </Helmet>
    </HelmetProvider>
  );
}
