"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { certifications, type Certification } from "@/lib/data/certifications"
import { ExternalLink, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"

// Extracted component to follow DRY principle
interface CertificationCardProps {
  cert: Certification
}

function CertificationCard({ cert }: CertificationCardProps) {
  // Get display name (shortened issuer)
  const displayIssuer = cert.issuer.includes("Learning & Outsourcing Center")
    ? cert.issuer.split(" Learning & Outsourcing Center")[0]
    : cert.issuer

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl leading-tight">{cert.name}</CardTitle>
              <CheckCircle2
                className="h-5 w-5 text-green-500 flex-shrink-0"
                aria-label="Active certification"
                role="img"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">{displayIssuer}</span>
              <span aria-hidden="true">•</span>
              <span>{cert.issueDate}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* Skills */}
        {cert.skills && cert.skills.length > 0 && (
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0" aria-label="Related skills">
            {cert.skills.slice(0, 4).map((skill) => (
              <li key={skill}>
                <Badge variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              </li>
            ))}
            {cert.skills.length > 4 && (
              <li>
                <Badge variant="secondary" className="text-xs">
                  +{cert.skills.length - 4} more
                </Badge>
              </li>
            )}
          </ul>
        )}

        {/* Credential Link */}
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            aria-label={`View credential for ${cert.name} (opens in new tab)`}
          >
            <span aria-hidden="true">View Credential</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </CardContent>
    </Card>
  )
}

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false)

  // Filter to show featured certs (first 3 QA/Tech + first 1 Domain)
  const qaTechCerts = certifications.filter(cert => cert.category === "qa-tech")
  const domainCerts = certifications.filter(cert => cert.category === "domain")

  const featuredQATech = qaTechCerts.slice(0, 3)
  const featuredDomain = domainCerts.slice(0, 1)

  const displayedCerts = showAll
    ? certifications
    : [...featuredQATech, ...featuredDomain]

  const hiddenCount = certifications.length - displayedCerts.length

  // Filter displayed certs by category for rendering
  const displayedQATech = displayedCerts.filter(cert => cert.category === "qa-tech")
  const displayedDomain = displayedCerts.filter(cert => cert.category === "domain")

  return (
    <section id="certifications" className="space-y-8" aria-labelledby="certifications-heading">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-primary rounded-full" aria-hidden="true" />
          <h2 id="certifications-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">
            Certifications
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Professional certifications in QA/Tech plus domain expertise for <strong>Sports Analytics</strong> and <strong>FinTech</strong> industries
        </p>
      </div>

      {/* QA/Tech Certifications */}
      {displayedQATech.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">QA/Tech Certifications</h3>
          <div className="grid grid-cols-1 gap-6">
            {displayedQATech.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      )}

      {/* Domain Expertise Certifications */}
      {displayedDomain.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Domain Expertise</h3>
          <div className="grid grid-cols-1 gap-6">
            {displayedDomain.map((cert) => (
              <CertificationCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {hiddenCount > 0 && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
            aria-label={
              showAll
                ? `Hide ${hiddenCount} certifications`
                : `Show all ${certifications.length} certifications, currently showing ${displayedCerts.length}`
            }
            aria-expanded={showAll}
          >
            <span>
              {showAll
                ? `Show Less`
                : `Show All Certifications (${certifications.length} total)`
              }
            </span>
            {showAll ? (
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      )}
    </section>
  )
}
