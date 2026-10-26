import { contactItems } from "./contactData";

export default function ContactInfo() {
  return (
    <ul className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2">
      {contactItems.map((item) => {
        const { title, value, icon: Icon } = item;
        const href = "href" in item ? item.href : undefined;

        const body = (
          <>
            <div className="icon-tile icon-tile-soft">
              <Icon size={20} aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-sm font-semibold">{title}</h2>
            <p className="mt-1 break-words text-sm text-muted-foreground">
              {value}
            </p>
          </>
        );

        return (
          <li key={title}>
            {href ? (
              <a
                href={href}
                className="panel block h-full min-w-0 p-5 transition-colors hover:border-brand focus-ring"
              >
                {body}
              </a>
            ) : (
              <div className="panel h-full min-w-0 p-5">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
