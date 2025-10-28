<script></script>

<template>
  <footer className="bg-card border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold"> T </span>
            </div>
            <span className="font-bold text-foreground"> Ticko </span>
          </Link>
          <p className="text-muted-foreground text-sm">
            Modern ticket management for teams that want to work smarter.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <RouterLink
                to="/#features"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Features
              </RouterLink>
            </li>
            <li>
              <Link href="#pricing" className="text-muted-foreground hover:text-primary text-sm">
                Pricing
              </Link>
            </li>
            <li>
              <RouterLink href="#" className="text-muted-foreground hover:text-primary text-sm">
                Integrations
              </RouterLink>
            </li>
            <li>
              <RouterLink href="#" className="text-muted-foreground hover:text-primary text-sm">
                Security
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-foreground mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <RouterLink to="#" className="text-muted-foreground hover:text-primary text-sm">
                About
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/" className="text-muted-foreground hover:text-primary text-sm">
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink href="#" className="text-muted-foreground hover:text-primary text-sm">
                Careers
              </RouterLink>
            </li>
            <li>
              <RouterLink to="#" className="text-muted-foreground hover:text-primary text-sm">
                Contact
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <RouterLink href="#" className="text-muted-foreground hover:text-primary text-sm">
                Privacy
              </RouterLink>
            </li>
            <li>
              <RouterLink href="#" className="text-muted-foreground hover:text-primary text-sm">
                Terms
              </RouterLink>
            </li>
            <li>
              <RouterLink href="#" className="text-muted-foreground hover:text-primary text-sm">
                Cookies
              </RouterLink>
            </li>
            <li>
              <RouterLink href="#" className="text-muted-foreground hover:text-primary text-sm">
                Status
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <p className="text-muted-foreground text-sm">© 2025 Ticko. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link to="#" className="text-muted-foreground hover:text-primary text-sm"> Twitter </Link>
          <Link to="#" className="text-muted-foreground hover:text-primary text-sm"> GitHub </Link>
          <Link to="#" className="text-muted-foreground hover:text-primary text-sm">
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  </footer>
</template>
