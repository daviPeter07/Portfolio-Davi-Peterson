'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useI18n } from '@/src/components/i18n-provider';
import { sectionIds } from '@/src/constants/section-ids';
import { localeToHtmlLang } from '@/src/lib/i18n-config';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';

export function ContactSection() {
  const { dictionary, locale } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => {
        setFormStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormStatus(null);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus(null);

    try {
      const timestamp = new Intl.DateTimeFormat(localeToHtmlLang[locale], {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }).format(new Date());

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: timestamp,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log(result.text);
      setFormStatus({
        message: dictionary.contact.form.success,
        type: 'success',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setFormStatus({
        message: dictionary.contact.form.error,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={sectionIds.contact} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {dictionary.contact.titleBefore}{' '}
            <span className="text-primary">{dictionary.contact.titleAccent}</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">{dictionary.contact.introTitle}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dictionary.contact.introDescription}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{dictionary.contact.info.email}</h4>
                    <p className="text-muted-foreground">davipetersondev173@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{dictionary.contact.info.phone}</h4>
                    <p className="text-muted-foreground">+55 (92) 99258-4985</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{dictionary.contact.info.location}</h4>
                    <p className="text-muted-foreground">{dictionary.contact.info.locationValue}</p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{dictionary.contact.form.title}</CardTitle>
                <CardDescription>{dictionary.contact.form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{dictionary.contact.form.name}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={dictionary.contact.form.namePlaceholder}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{dictionary.contact.form.email}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={dictionary.contact.form.emailPlaceholder}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{dictionary.contact.form.subject}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={dictionary.contact.form.subjectPlaceholder}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{dictionary.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={dictionary.contact.form.messagePlaceholder}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {dictionary.contact.form.sending}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {dictionary.contact.form.submit}
                      </>
                    )}
                  </Button>

                  {formStatus && (
                    <div
                      className={`mt-4 flex items-center justify-center gap-2 text-center p-2 rounded-md text-sm ${
                        formStatus.type === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {formStatus.type === 'success' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
