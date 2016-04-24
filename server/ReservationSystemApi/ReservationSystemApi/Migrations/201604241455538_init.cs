namespace ReservationSystemApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Duration = c.Int(nullable: false),
                        About = c.String(),
                        Start = c.DateTime(nullable: false),
                        TicketPrice = c.Int(nullable: false),
                        Hall_Id = c.Int(nullable: false),
                        Owner_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Halls", t => t.Hall_Id, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.Owner_Id)
                .Index(t => t.Hall_Id)
                .Index(t => t.Owner_Id);
            
            CreateTable(
                "dbo.Halls",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        ScreenX = c.Double(nullable: false),
                        ScreenY = c.Double(nullable: false),
                        Owner_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.Owner_Id)
                .Index(t => t.Owner_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Password = c.String(nullable: false),
                        Email = c.String(nullable: false, maxLength: 255),
                        IsOrganizer = c.Boolean(nullable: false),
                        Name = c.String(nullable: false),
                        Token_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Tokens", t => t.Token_Id)
                .Index(t => t.Email, unique: true)
                .Index(t => t.Token_Id);
            
            CreateTable(
                "dbo.Tokens",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AccessToken = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.AccessToken, unique: true);
            
            CreateTable(
                "dbo.Rows",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Number = c.Int(nullable: false),
                        Hall_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Halls", t => t.Hall_Id)
                .Index(t => t.Hall_Id);
            
            CreateTable(
                "dbo.Seats",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Number = c.Int(nullable: false),
                        x = c.Double(nullable: false),
                        y = c.Double(nullable: false),
                        Row_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Rows", t => t.Row_Id)
                .Index(t => t.Row_Id);
            
            CreateTable(
                "dbo.Reservations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Event_Id = c.Int(nullable: false),
                        Owner_Id = c.Int(),
                        Row_Id = c.Int(nullable: false),
                        Seat_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Events", t => t.Event_Id, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.Owner_Id)
                .ForeignKey("dbo.Rows", t => t.Row_Id, cascadeDelete: true)
                .ForeignKey("dbo.Seats", t => t.Seat_Id, cascadeDelete: true)
                .Index(t => t.Event_Id)
                .Index(t => t.Owner_Id)
                .Index(t => t.Row_Id)
                .Index(t => t.Seat_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Reservations", "Seat_Id", "dbo.Seats");
            DropForeignKey("dbo.Reservations", "Row_Id", "dbo.Rows");
            DropForeignKey("dbo.Reservations", "Owner_Id", "dbo.Users");
            DropForeignKey("dbo.Reservations", "Event_Id", "dbo.Events");
            DropForeignKey("dbo.Events", "Owner_Id", "dbo.Users");
            DropForeignKey("dbo.Events", "Hall_Id", "dbo.Halls");
            DropForeignKey("dbo.Rows", "Hall_Id", "dbo.Halls");
            DropForeignKey("dbo.Seats", "Row_Id", "dbo.Rows");
            DropForeignKey("dbo.Halls", "Owner_Id", "dbo.Users");
            DropForeignKey("dbo.Users", "Token_Id", "dbo.Tokens");
            DropIndex("dbo.Reservations", new[] { "Seat_Id" });
            DropIndex("dbo.Reservations", new[] { "Row_Id" });
            DropIndex("dbo.Reservations", new[] { "Owner_Id" });
            DropIndex("dbo.Reservations", new[] { "Event_Id" });
            DropIndex("dbo.Seats", new[] { "Row_Id" });
            DropIndex("dbo.Rows", new[] { "Hall_Id" });
            DropIndex("dbo.Tokens", new[] { "AccessToken" });
            DropIndex("dbo.Users", new[] { "Token_Id" });
            DropIndex("dbo.Users", new[] { "Email" });
            DropIndex("dbo.Halls", new[] { "Owner_Id" });
            DropIndex("dbo.Events", new[] { "Owner_Id" });
            DropIndex("dbo.Events", new[] { "Hall_Id" });
            DropTable("dbo.Reservations");
            DropTable("dbo.Seats");
            DropTable("dbo.Rows");
            DropTable("dbo.Tokens");
            DropTable("dbo.Users");
            DropTable("dbo.Halls");
            DropTable("dbo.Events");
        }
    }
}
