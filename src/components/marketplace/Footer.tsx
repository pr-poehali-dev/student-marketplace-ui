import React from "react";

const Footer = () => {
  const categories = [
    { name: "Электроника", href: "#" },
    { name: "Учебники", href: "#" },
    { name: "Услуги", href: "#" },
    { name: "Мебель", href: "#" },
  ];

  const helpLinks = [
    { name: "Как продавать", href: "#" },
    { name: "Как покупать", href: "#" },
    { name: "Правила", href: "#" },
    { name: "Поддержка", href: "#" },
  ];

  const contacts = [
    "БФУ им. И. Канта",
    "support@studdeal.ru",
    "Telegram: @studdeal",
  ];

  return (
    <footer className="bg-primary/5 py-8 px-6 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold text-primary mb-3 text-sm">
              stuDDeal
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Маркетплейс для студентов БФУ. Покупай и продавай легко и
              безопасно.
            </p>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-sm">Категории</h5>
            <ul className="space-y-1.5">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-sm">Помощь</h5>
            <ul className="space-y-1.5">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-3 text-sm">Контакты</h5>
            <ul className="space-y-1.5">
              {contacts.map((contact, index) => (
                <li key={index} className="text-xs text-muted-foreground">
                  {contact}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 stuDDeal. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
