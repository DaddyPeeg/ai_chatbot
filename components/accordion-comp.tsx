import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import Link from 'next/link'

export function AccordionComp() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <p className="text-base">Shop</p>
        </AccordionTrigger>
        <AccordionContent>
          <Link href={''}>
            <p className="pl-8">Reliable Service</p>
          </Link>
          <Link href={''}>
            <p className="pl-8 pt-4">Receives Latest Updates</p>
          </Link>
          <Link href={''}>
            <p className="pl-8 pt-4">Easy to use</p>
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
