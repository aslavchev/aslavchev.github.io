"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { certifications } from "@/lib/data/certifications"
import { Award, ExternalLink, Calendar, CheckCircle2, ChevronDown } from "lucide-react"

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false)

  // Show top 4: DevOps, Web Services, Automated Testing, Commodities Trading
  const featuredCertIds = ["1", "2", "3", "4"]
  const displayedCerts = showAll
    ? certifications
    : certifications.filter(cert => featuredCertIds.includes(cert.id))

  const hiddenCount = certifications.length - featuredCertIds.length

  return (
    <section id="certifications" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Certifications</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Professional certifications in QA/Tech and Domain Expertise (FinTech, Sports Analytics)
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedCerts.map((cert) => {
          const isExpiring = cert.expiryDate && new Date(cert.expiryDate) < new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
          const isExpired = cert.expiryDate && new Date(cert.expiryDate) < new Date()

          return (
            <Card key={cert.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {/* Award Icon Background */}
              <div className="absolute top-4 right-4 opacity-5">
                <Award className="h-24 w-24 text-primary" />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <CardTitle className="text-xl leading-tight">{cert.name}</CardTitle>
                    <CardDescription className="text-sm font-medium">{cert.issuer}</CardDescription>
                  </div>
                  {!isExpired && (
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Issued {cert.issueDate}</span>
                  </div>
                  {cert.expiryDate && (
                    <div className={`flex items-center gap-1.5 ${isExpiring ? 'text-orange-500' : ''} ${isExpired ? 'text-red-500' : ''}`}>
                      <span>•</span>
                      <span>Expires {cert.expiryDate}</span>
                    </div>
                  )}
                </div>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="text-xs text-muted-foreground pt-1">
                    ID: {cert.credentialId}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Description */}
                {cert.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                )}

                {/* Skills */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Credential Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <span>View Credential</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Show More Button */}
      {!showAll && hiddenCount > 0 && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(true)}
            className="gap-2"
          >
            <span>Show {hiddenCount} more certification{hiddenCount > 1 ? 's' : ''}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">{certifications.length}</div>
          <div className="text-sm text-muted-foreground">Total Certifications</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {certifications.filter(c => !c.expiryDate || new Date(c.expiryDate) > new Date()).length}
          </div>
          <div className="text-sm text-muted-foreground">Active</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {new Set(certifications.map(c => c.issuer)).size}
          </div>
          <div className="text-sm text-muted-foreground">Issuers</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {new Date().getFullYear() - parseInt(certifications.sort((a, b) =>
              parseInt(a.issueDate) - parseInt(b.issueDate)
            )[0]?.issueDate || '0')}+
          </div>
          <div className="text-sm text-muted-foreground">Years Certified</div>
        </div>
      </div>
    </section>
  )
}
