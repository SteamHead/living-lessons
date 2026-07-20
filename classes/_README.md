# Classes

One markdown file per class per school year. These files are the **identity
card** of a class — authored by a human a few times a year — and they power the
Atlas (map + timeline) and the top of each Class Page.

## The write-path rule (why classes are markdown AND database)

Decided in D21. The factor that splits the data is **who writes it, and when**:

- **Markdown (this folder):** data a human authors deliberately and rarely —
  name, school, city, coordinates, year, grade, blurb, public toggle. Written
  each September, edited in Obsidian, reviewed in git.
- **Database (Cloudflare D1, later):** data the *app* writes at runtime —
  badge grants at lesson close, mid-class badge swaps, journal posts, media
  references. You can't git-commit from a projector at 10:42am. The skill
  chart is not stored anywhere: it is **computed** by aggregating grants from
  the database, keyed to the class `id` below.

The `id` is the join key between the two worlds and is stable forever.

## Frontmatter

```yaml
id: "sunset-g5-2025"      # school-grade-year; stable forever
name: "Grade 5 Makers"    # kid-facing nickname (no student or teacher names)
school: "Sunset Elementary"
city: "San Francisco"
country: "US"
lat: 37.749
lng: -122.499
year: "2025-26"
grade: "5"
status: "active"          # active | archived
public: false             # D5: teacher-controlled public visibility
blurb: "One or two sentences in the teacher's voice."
```

Privacy (D6): class nickname, school, city, grade, year are fine; no rosters,
no student names, no staff surnames. The `public` flag governs whether this
class renders on the public Atlas at all.

The 68 files generated 2026-07-19 are **sample data** from real school history —
blurbs and nicknames are placeholders; edit freely.
