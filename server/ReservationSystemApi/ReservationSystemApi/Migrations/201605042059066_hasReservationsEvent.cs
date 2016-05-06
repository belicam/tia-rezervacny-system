namespace ReservationSystemApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class hasReservationsEvent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Events", "HasReservations", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Events", "HasReservations");
        }
    }
}
